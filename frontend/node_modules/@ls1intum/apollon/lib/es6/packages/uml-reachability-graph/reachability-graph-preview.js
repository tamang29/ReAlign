import { UMLReachabilityGraphMarking } from './uml-reachability-graph-marking/uml-reachability-graph-marking';
export const composeReachabilityGraphPreview = (layer, translate) => {
    const elements = [];
    const umlReachabilityGraphMarking = new UMLReachabilityGraphMarking({
        name: translate('packages.ReachabilityGraph.ReachabilityGraphMarking'),
        bounds: { x: 0, y: 0, width: 160, height: 100 },
    });
    elements.push(umlReachabilityGraphMarking);
    return elements;
};
//# sourceMappingURL=reachability-graph-preview.js.map