$.get('https://rawgit.com/everypolitician/everypolitician-data/master/countries.json').success(function (countries) {
  var html = [];
  countries.forEach(function (country) {
    country.legislatures.forEach(function (legislature) {
      html.push(`
        <div>
          <p>${country.name} - ${legislature.name}</p>
          <form action="https://everypolitician-rebuilder.herokuapp.com/" method="post">
            <input type="hidden" name="country" value="${country.slug}">
            <input type="hidden" name="legislature" value="${legislature.slug}">
            <input type="submit" value="Rebuild">
          </form>
        </div>
      `);
    });
  });
  $('#root').html(html.join(''));
});
