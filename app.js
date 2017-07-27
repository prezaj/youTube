var GITHUB_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-thumbnail" href=""> <img src=""> </a> <br> <a class="js-result-name" href="" target="_blank"> </a> on channel <a class="js-channel" target="_blank"></a></h2>' +

  '</div>'
);

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    key: 'AIzaSyDAldt3MvZgSfio0D0-jGBPU8bVcFsaW4Y',
    q: searchTerm + " in:name",
    per_page: 5
  }
  console.log( $.getJSON(GITHUB_SEARCH_URL, query, callback))
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}


function renderResult(result) {
  var template = $(RESULT_HTML_TEMPLATE);
  template.find(".js-result-name").text(result.snippet.title).attr("href", 'https://www.youtube.com/watch?v='+result.id.videoId);
  template.find("img").prop("src",result.snippet.thumbnails.medium.url);
  template.find(".js-thumbnail").attr("href", 'https://www.youtube.com/watch?v='+result.id.videoId);
  template.find(".js-channel").text(result.snippet.channelTitle).attr("href", 'https://www.youtube.com/channel/'+result.snippet.channelId);
  return template;
}

function displayGitHubSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
