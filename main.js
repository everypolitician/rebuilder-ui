$.get('https://rawgit.com/everypolitician/everypolitician-data/master/countries.json').success(function (countries) {
  var html = [];
  countries.forEach(function (country) {
    country.legislatures.forEach(function (legislature) {
      html.push(`
        <div style="border: 1px solid #555; padding: 1em; margin-bottom: 0.5em;">
          <p>${country.name} - ${legislature.name} <small>Last updated: ${new Date(legislature.lastmod * 1000)}</small></p>
          <form action="https://everypolitician-rebuilder.herokuapp.com/" method="post">
            <input type="hidden" name="country" value="${country.slug}">
            <input type="hidden" name="legislature" value="${legislature.slug}">
            <input type="submit" value="Rebuild all sources">
          </form>
          <div>
            <a href="#" class="js-show-all-sources" data-country="${country.slug}" data-legislature="${legislature.slug}" data-sources-dir="${legislature.sources_directory}">Fetch all sources</a>
          </div>
        </div>
      `);
    });
  });
  $('#root').html(html.join(''));
  $('.js-show-all-sources').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    var country = $this.data('country');
    var legislature = $this.data('legislature');
    var sourcesDir = $this.data('sources-dir');
    $this.text('Loading sources...');
    $.get(`https://rawgit.com/everypolitician/everypolitician-data/master/${sourcesDir}/instructions.json`).success(function (instructions) {
      var html = [];
      instructions.sources.forEach(function (source) {
        html.push(`
          <div>
            <p>${country} - ${legislature} - ${source.file}</p>
            <form action="https://everypolitician-rebuilder.herokuapp.com/" method="post">
              <input type="hidden" name="country" value="${country}">
              <input type="hidden" name="legislature" value="${legislature}">
              <input type="hidden" name="source" value="${source.file}">
              <input type="submit" value="Rebuild ${source.file}">
            </form>
          </div>
        `);
      });
      $this.replaceWith(html.join(''));
    });
  });
});
