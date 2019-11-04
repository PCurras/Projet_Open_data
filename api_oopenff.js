

/**
 * Searches for an ingeredient in the API
 * filters out elements that don't contain in their title the ingredient
 * sorts the ingredients according to their title length ( ex : if we look for milk we first suggest soy milk instead of Milk Chocolat Biscuits )
 * returns array of products
 * @param ingredient
 * @return {Promise<Array>}
 */
async function search_ingredient(ingredient) {
    let search_results =[];
    return fetch('https://fr.openfoodfacts.org/cgi/search.pl?search_terms=' + ingredient + '&json=1&page_size=500')
        .then(function (response)
        {
            return response.json()
        })
        .then(function (data) {
            for (var i = 0; i < data.products.length; i++) {
                if (data.products[i].product_name.includes(ingredient))
                {
                    //results to return
                    search_results.push(data.products[i]);
                    // saving all results to the ingredients table
                    ingredients.push(data.products[i]);
                }
            }
            search_results = search_results.sort(function(a,b) { { return  a.product_name.length - b.product_name.length; }});
            console.log(search_results[0].product_name);
            return Promise.resolve(search_results);
        })
}