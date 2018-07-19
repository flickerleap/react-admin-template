export const getAbilitiesFromLinks = (links = []) => {
    return links.reduce((abilities, link) => {
        abilities.push({
            name: link.ability,
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

export const canAccess = (userAbilities, neededAbilities, wildcard = '*') => {
    let status = true;

    neededAbilities.forEach((neededAbility) => {
        if (neededAbility.name === wildcard) {
            status = true && status;
        } else {
            const foundAbility = userAbilities.find((ability) => {
                return ability.name === neededAbility.name && ability.entity_type === neededAbility.entity_type;
            });
            status = foundAbility !== undefined && status;
        }
    });

    return status;
};