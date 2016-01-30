var app = function () {

    var firebaseUrl = 'https://netflixtitles.firebaseio.com/netflix';
    var netflix = new Firebase(firebaseUrl);
    var omdbApi = 'http://www.omdbapi.com/?plot=short&r=json&apikey=969a7a44';

    var init = function () {
        var todayDate = getDate();
        getNetflixTitles(todayDate);
    };

    var getNetflixTitles = function () {
        netflix.child("months").on("value", function(snapshot) {
            snapshot.forEach(function(snapshotMonths) {
               snapshotMonths.forEach(function (snapshotDays) {
                   snapshotDays.forEach(function (snapshotTitles) {
                       _.map(snapshotTitles.val(), function (titles) {
                           _.map(titles, function (title) {
                               if (doesDataExist(title)) return; //already got data.
                               var snapshotLocation = snapshotTitles.ref().toString();
                               addTitleData(title, snapshotLocation, sendData);
                           });
                       });
                   });
               });
            });
        });
    };

    var doesDataExist = function (title) {
        if (title && title.Title === 'Undefined') return true;
        return (title && title.Response && title.Response === 'True') || (title && title.Director && title.Director.length > 3);
    };

    var addTitleData = function (title, snapshotLocation, callback) {
        var url = omdbApi + '&t=' + title.name + '&y=' + (title.year || '');
        httpGetAsync(url, function (response) {
            var titleResponse = JSON.parse(response);
            if (titleResponse.Error) {
                return;
            }
            callback(_.extend(title, titleResponse), snapshotLocation);
        });
    };

    var sendData = function (title, snapshotLocation) {
        console.log(title);
        var newNetflix = new Firebase(snapshotLocation);
        newNetflix.child('titles').child(title.name).set(title);
    };

    var httpGetAsync = function (theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    };

    var getDate = function () {
        var date = new moment();
        return {
            year: date.year(),
            month: date.month(),
            day: date.date()
        };
    };

    init();
};

app();