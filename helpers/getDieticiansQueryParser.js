const GetDieticiansQueryParser = (query) => {
    try {
        const expertiseIds = query.expertises
            ? JSON.parse(query.expertises)
            : [];

        const searchQuery = query.query ? query.query : "";

        console.log(query);

        const showPending = query.isPending ? true : false;

        if (typeof searchQuery != 'string')
            return { error: "Search query must be a string" };

        if (typeof expertiseIds != 'object')
            return { error: "Expertises must be an array of integers" };

        expertiseIds.forEach(id => {
            if (isNaN(id)) 
                return { error: "Expertises must be an array of integers" };
        });

        return { searchQuery, expertiseIds, showPending };
    } catch {
        return { error: "Invalid query params" };
    }
}

module.exports = GetDieticiansQueryParser;