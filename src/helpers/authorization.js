export const getAbilitiesFromLinks = (links = []) => {
    return links.reduce((abilities, link) => {
        abilities.push({
            name: link.action,
            entity_type: link.type
        });

        return abilities;
    }, []);
};

export const getAbilitiesFromUser = (userAbilities = []) => {
    return userAbilities.reduce((abilities, ability) => {
        abilities.push({
            name: ability.name,
            entity_type: ability.entity_type
        });

        return abilities;
    }, []);
};