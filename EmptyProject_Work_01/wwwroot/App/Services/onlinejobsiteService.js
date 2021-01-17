angular.module("projectApp")
    .factory("onlinejobsiteService", ($http) => {
        return {
            getOnlinejobsiteWithAdvertisement: () => {
                return $http({
                    method: "GET",
                    url: "/OnlinejobsiteData/OnlinejobsiteWithAdvertisement",
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
            }
        }
    });