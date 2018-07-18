export const getCapabilitiesFromLinks = (modelType, links = []) => {
    return links.reduce((capabilities, link) => {
        const {children = []} = link;
        if(children.length > 0) {
            capabilities.push(...getCapabilitiesFromLinks(modelType, children));
        }
        capabilities.push();

        return capabilities;
    }, []);
};