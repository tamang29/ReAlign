export declare const UMLRelationshipRepository: {
    startReconnecting: (endpoint: "source" | "target", id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    reconnect: (target: import("../uml-element/uml-element-port").IUMLElementPort) => import("../../utils/actions/actions").AsyncAction;
    endReconnecting: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    get: (element?: import("../uml-element/uml-element").IUMLElement | undefined) => import("./uml-relationship").UMLRelationship | null;
    getById: (id: string) => import("../../utils/actions/actions").AsyncAction<import("../uml-element/uml-element").UMLElement | null>;
    getSupportedConnectionsForElements: (elements: import("../uml-element/uml-element").UMLElement | import("../uml-element/uml-element").UMLElement[]) => import("../..").UMLRelationshipType[];
    layout: (id: string, path: import("../../utils/geometry/path").IPath, bounds: import("../../utils/geometry/boundary").IBoundary) => import("./uml-relationship-types").LayoutAction;
    layoutWaypoints: (id: string, path: import("../../utils/geometry/path").IPath, bounds: import("../../utils/geometry/boundary").IBoundary) => import("./uml-relationship-types").WaypointLayoutAction;
    flip: (id?: string | string[] | undefined) => import("../../utils/actions/actions").AsyncAction;
    startWaypointsLayout: (id: string, path: import("../../utils/geometry/path").IPath, bounds: import("../../utils/geometry/boundary").IBoundary) => import("../../utils/actions/actions").AsyncAction;
    endWaypointsLayout: (id: string) => import("../../utils/actions/actions").AsyncAction;
};
