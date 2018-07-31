/**
 *
 * @param {Array} links
 * @returns {*|Array}
 */
export const getAbilitiesFromLinks = (links = []) => {
    return links.reduce((abilities, link) => {
        abilities.push({
            name: link.ability,
            type: link.type
        });

        return abilities;
    }, []);
};

/**
 *
 * @param {Array} userAbilities
 * @param {string} entityField
 * @returns {*|Array}
 */
export const getAbilitiesFromUser = (userAbilities = [], entityField = 'entity_type') => {
    userAbilities = removeUnneededAbilities(userAbilities, 'index', 'show');

    return userAbilities.reduce((abilities, ability) => {
        abilities.push({
            name: ability.name,
            type: ability[entityField]
        });

        return abilities;
    }, []);
};

/**
 *
 * @param {Array} abilities
 * @param {string} abilityToHave
 * @param {string} abilityToRemove
 * @returns {Array}
 */
export const removeUnneededAbilities = (abilities = [], abilityToHave, abilityToRemove) => {
    const types = getEntityTypes(abilities);
    types.forEach((type) => {
        const toHaveIndex = getIndex(abilities, {
            entity_type: type,
            name: abilityToHave
        });
        const toRemoveIndex = getIndex(abilities, {
            entity_type: type,
            name: abilityToRemove
        });

        if (toHaveIndex > -1 && toRemoveIndex > -1) {
            abilities.splice(toRemoveIndex, 1);
        }
    });

    return abilities;
};

/**
 *
 * @param {Array} abilities
 * @param {string} entityField
 * @returns {*|Array}
 */
export const getEntityTypes = (abilities = [], entityField = 'entity_type') => {
    return abilities.reduce((types, ability) => {
        const type = ability[entityField];
        if (!types.includes(type)) {
            types.push(type);
        }

        return types;
    }, []);
};

/**
 * Gets the index of the requested ability from the abilities array.
 *
 * @param {Array} abilities
 * @param {{name, entity_type}} item
 * @returns {number}
 */
export const getIndex = (abilities = [], item) => {
    return abilities.findIndex((ability) => {
        return ability.name === item.name && ability.entity_type === item.entity_type;
    });
};

/**
 *
 * @param {Array} userAbilities
 * @param {Array} neededAbilities
 * @param {string} wildcard
 * @returns {boolean}
 */
export const canAccess = (userAbilities, neededAbilities, wildcard = '*') => {
    let status = true;

    neededAbilities.forEach((neededAbility) => {
        if (hasWildcard(neededAbility, wildcard)) {
            status = true && status;
        } else if (hasAdminAccess(userAbilities, wildcard)) {
            status = true && status;
        } else {
            const foundAbility = userAbilities.find((ability) => {
                return ability.name === neededAbility.name && ability.type === neededAbility.type;
            });
            status = foundAbility !== undefined && status;
        }
    });

    return status;
};

/**
 *
 *
 * @param {Array} userAbilities
 * @param {string} wildcard
 * @returns {boolean}
 */
export const hasAdminAccess = (userAbilities = [], wildcard = '*') => {
    return userAbilities.length === 1 && userAbilities[0].type === wildcard && userAbilities[0].name === wildcard;
};

/**
 *
 * @param {{name, type}} ability
 * @param {string} wildcard
 * @returns {boolean}
 */
export const hasWildcard = (ability, wildcard = '*') => {
    return ability.name === wildcard || (ability.name === wildcard && ability.type === wildcard);
};