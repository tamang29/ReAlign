export declare const UMLElementRepository: {
    updateStart: (id: string | string[]) => import("../../utils/actions/actions").AsyncAction;
    updateEnd: (id: string | string[]) => import("./updatable/updatable-types").UpdateEndAction;
    updateEndAll: () => import("./updatable/updatable-types").UpdateEndAllAction;
    makeInteractive: (id: string) => import("./interactable/interactable-types").SelectAction;
    unmakeInteractive: (id: string) => import("./interactable/interactable-types").DeselectAction;
    startConnecting: (direction: import("./uml-element-port").Direction | import("./uml-element-port").Direction[], id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    connect: (target: import("./uml-element-port").IUMLElementPort | import("./uml-element-port").IUMLElementPort[], source?: import("./uml-element-port").IUMLElementPort | import("./uml-element-port").IUMLElementPort[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    endConnecting: (port?: import("./uml-element-port").IUMLElementPort | import("./uml-element-port").IUMLElementPort[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    startResizing: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    resize: (delta: {
        width: number;
        height: number;
    }, resizeFrom: import("./uml-element").ResizeFrom, id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    endResizing: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    startMoving: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    move: (delta: {
        x: number;
        y: number;
    }, id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    endMoving: (id?: string | string[] | undefined, keyboard?: boolean) => import("../../utils/actions/actions").AsyncAction;
    remoteSelectionChange: (selector: import("../../packages/uml-element-selector-type").UMLElementSelectorType, changes: import("./remote-selectable/remote-selectable-types").RemoteSelectionChange[]) => import("./remote-selectable/remote-selectable-types").RemoteSelectionChangeAction;
    remoteSelect: (selector: import("../../packages/uml-element-selector-type").UMLElementSelectorType, ids: string[]) => import("./remote-selectable/remote-selectable-types").RemoteSelectionChangeAction;
    remoteDeselect: (selector: import("../../packages/uml-element-selector-type").UMLElementSelectorType, ids: string[]) => import("./remote-selectable/remote-selectable-types").RemoteSelectionChangeAction;
    remoteSelectDeselect: (selector: import("../../packages/uml-element-selector-type").UMLElementSelectorType, select: string[], deselect: string[]) => import("./remote-selectable/remote-selectable-types").RemoteSelectionChangeAction;
    pruneRemoteSelectors: (allowedSelectors: import("../../packages/uml-element-selector-type").UMLElementSelectorType[]) => import("./remote-selectable/remote-selectable-types").RemoteSelectionPruneSelectorsAction;
    select: (id?: string | string[] | undefined, overwrite?: boolean | undefined) => import("../../utils/actions/actions").AsyncAction;
    deselect: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    hover: (id: string | string[]) => import("./hoverable/hoverable-types").HoverAction;
    leave: (id: string | string[]) => import("./hoverable/hoverable-types").LeaveAction;
    create: <T extends import("./uml-element").IUMLElement>(value: T | T[], owner?: string | undefined) => import("../../utils/actions/actions").AsyncAction;
    get: (element?: import("./uml-element").IUMLElement | undefined) => import("./uml-element").UMLElement | null;
    getById: (id: string) => import("../../utils/actions/actions").AsyncAction<import("./uml-element").UMLElement | null>;
    update: <T_1 extends import("./uml-element").IUMLElement>(id: string | string[], values: Partial<T_1>) => import("./uml-element-types").UpdateAction<T_1>;
    delete: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    getAbsolutePosition: (id: string) => import("../../utils/actions/actions").AsyncAction<import("../../utils/geometry/point").Point>;
    getChildren: (id: string) => import("../../utils/actions/actions").AsyncAction<import("./uml-element").IUMLElement[]>;
};
