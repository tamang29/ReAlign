"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchVerifier = exports.isSignedOperation = exports.isReplaceOperation = void 0;
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
/**
 * @param operation
 * @returns true if the operation is a replace operation, false otherwise
 */
function isReplaceOperation(operation) {
    return operation.op === 'replace';
}
exports.isReplaceOperation = isReplaceOperation;
/**
 * @param operation
 * @returns true if the operation is a signed operation, false otherwise. A signed operation is either
 * a replace operation with a hash property or any other operation.
 */
function isSignedOperation(operation) {
    return !isReplaceOperation(operation) || 'hash' in operation;
}
exports.isSignedOperation = isSignedOperation;
/**
 * A patch verifier enables otpimisitc discard of incomging changes.It can be used to sign
 * each operation (or opeerations of each patch) and track them. If the server broadcasts changes
 * of the same scope (e.g. the same path) before re-broadcasting that particular change, the client
 * can safely discard the change as it will (optimistically) be overridden when the server re-broadcasts
 * the tracked change.
 *
 * This greatly helps with stuttering issues due to clients constantly re-applying changes they have
 * already applied locally but in a different order. See
 * [**this issue**](https://github.com/ls1intum/Apollon_standalone/pull/70) for more details.
 */
var PatchVerifier = /** @class */ (function () {
    function PatchVerifier() {
        var _this = this;
        this.waitlist = {};
        this.cleanup = new rxjs_1.Subject();
        // This ensures that the waitlist is cleaned up after a certain time.
        // Otherwise, due to message loss, some specific paths on the waitlist might be locked up.
        this.cleanup
            .pipe((0, rxjs_1.groupBy)(function (path) { return path; }), (0, rxjs_1.mergeMap)(function (group) { return group.pipe((0, rxjs_1.debounceTime)(PatchVerifier.SUPRESSION_WINDOW)); }), (0, rxjs_1.tap)(function (path) { return delete _this.waitlist[path]; }))
            .subscribe();
    }
    /**
     * Signs an operation and tracks it. Only replace operations are signed and tracked.
     * @param operation
     * @returns The signed version of the operation (to be sent to the server)
     */
    PatchVerifier.prototype.signOperation = function (operation) {
        if (isReplaceOperation(operation)) {
            var hash = Math.random().toString(36).substring(2, 15);
            var path = operation.path;
            this.waitlist[path] = hash;
            this.cleanup.next(path);
            return tslib_1.__assign(tslib_1.__assign({}, operation), { hash: hash });
        }
        else {
            return operation;
        }
    };
    /**
     * Signs all operations inside the patch.
     * @param patch
     * @returns the signed patch (to be sent to the server)
     */
    PatchVerifier.prototype.sign = function (patch) {
        var _this = this;
        return patch.map(function (op) { return _this.signOperation(op); });
    };
    /**
     * Checks whether the operation should be applied or should it be optimisitcally discarded.
     * - If the operation is not a replace operation, it is always applied.
     * - If the operation is a replace operation but it is not signed, it is always applied.
     * - If the operation is a signed replace operation and no other operation with the same path is tracked,
     *   it will be applied.
     * - Otherwise it will be discarded.
     *
     * If it receives an operation that is already tracked, it will be discarded, and the
     * operation will be untracked (so following operations on the same path will be applied).
     *
     * @param operation
     * @returns true if the operation should be applied, false if it should be discarded.
     */
    PatchVerifier.prototype.isVerifiedOperation = function (operation) {
        if (isReplaceOperation(operation) && isSignedOperation(operation) && operation.path in this.waitlist) {
            if (this.waitlist[operation.path] === operation.hash) {
                delete this.waitlist[operation.path];
            }
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Filters an incoming patch, only leaving the operations that should be applied.
     * @param patch
     * @returns a patch with operations that should be applied.
     */
    PatchVerifier.prototype.verified = function (patch) {
        var _this = this;
        return patch.filter(function (op) { return _this.isVerifiedOperation(op); });
    };
    /**
     * In some cases, the rebroadcast of a change might be delayed or lost.
     * To prevent the client from indefninitely discarding changes on the same path,
     * the verifier will discard changes on the same path until a certain time.
     */
    PatchVerifier.SUPRESSION_WINDOW = 200;
    return PatchVerifier;
}());
exports.PatchVerifier = PatchVerifier;
//# sourceMappingURL=patch-verifier.js.map