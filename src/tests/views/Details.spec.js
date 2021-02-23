import {mount, createLocalVue} from '@vue/test-utils';
import VueRouter from "vue-router";
import moxios from "moxios";
import Details from "@/views/Details.vue";

/* eslint-disable */


const showDetails = {
    "id": 180,
    "url": "http://www.tvmaze.com/shows/180/firefly",
    "name": "Firefly",
    "type": "Reality",
    "language": "English",
    "genres": ["Action", "Drama"],
    "status": "Ended",
    "runtime": 30,
    "premiered": "2001-04-11",
    "officialSite": "http://www.firefly.com",
    "schedule": {
        "time": "22:30",
        "days": ["Monday"]
    },
    "rating": {
        "average": 8.5
    },
    "weight": 98,
    "network": {
        "id": 34,
        "name": "Paramount Network",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        }
    },
    "webChannel": null,
    "externals": {
        "tvrage": 3138,
        "thetvdb": 74709,
        "imdb": "tt0096563"
    },
    "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg"
    },
    "summary": "<p>Some Summary</p>",
    "updated": 1591767246,
    "_links": {
        "self": {
            "href": "http://api.tvmaze.com/shows/180"
        },
        "previousepisode": {
            "href": "http://api.tvmaze.com/episodes/1859522"
        }
    }
}

const showDetailsOriginal = {
    "id": 180,
    "url": "http://www.tvmaze.com/shows/180/firefly",
    "name": "Firefly",
    "type": "Reality",
    "language": "English",
    "genres": ["Action", "Drama"],
    "status": "Ended",
    "premiered": "2001-04-11",
    "officialSite": "http://www.firefly.com",
    "rating": {
        "average": 8.5
    },
    "webChannel": null,
    "image": null,
    "summary": "<p>Some Summary</p>",
}

const showDetailsMedium = {
    "id": 180,
    "url": "http://www.tvmaze.com/shows/180/firefly",
    "name": "Firefly",
    "type": "Reality",
    "language": "English",
    "genres": ["Action", "Drama"],
    "status": "Ended",
    "premiered": "2001-04-11",
    "officialSite": "http://www.firefly.com",
    "rating": {
        "average": 8.5
    },
    "webChannel": null,
    "image": {"medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg"},
    "summary": "<p>Some Summary</p>",
}

const castDetails = {
    "person": {
        "id": 35596,
        "url": "http://www.tvmaze.com/people/35596/justin-roiland",
        "name": "Justin Roiland",
        "country": {
            "name": "United States",
            "code": "US",
            "timezone": "America/New_York"
        },
        "birthday": "1980-02-21",
        "deathday": null,
        "gender": "Male",
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/3602.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/3602.jpg"
        },
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/people/35596"
            }
        }
    },
    "character": {
        "id": 56241,
        "url": "http://www.tvmaze.com/characters/56241/rick-and-morty-rick-sanchez",
        "name": "Rick Sanchez",
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/105/262781.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/105/262781.jpg"
        },
        "_links": {
            "self": {
                "href": "http://api.tvmaze.com/characters/56241"
            }
        }
    },
    "self": false,
    "voice": true
}

const seasonDetails = [
    {"id":1,"number":1,"name":"","episodeOrder":13,"premiereDate":"2013-06-24","endDate":"2013-09-16"},
    {"id":2,"number":2,"name":"","episodeOrder":13,"premiereDate":"2014-06-24","endDate":"2014-09-16"}
]


const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Renders Details Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        moxios.install();
        wrapper = mount(Details, {
            localVue,
            router,
        });
    })

    afterEach(() => {
        moxios.uninstall();
        wrapper.destroy();
      });

    it("fetching show details correctly", (done) => {

        moxios.wait(function () {
            let request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: showDetails
            }).then(function () {
            expect(Object.keys(wrapper.vm.showInfo).length).toBe(20)
            done();
        });
                
        });
    });

    it("fetching cast details correctly", (done) => {

        moxios.wait(function () {
            let request = moxios.requests.at(1);
            request.respondWith({
                status: 200,
                response: [castDetails]
            }).then(function () {
                expect(wrapper.vm.castInfo.length).toBe(1)
                done();
        });
                
        });
    });

    it("fetching season details correctly", (done) => {

        moxios.wait(function () {
            let request = moxios.requests.at(2);
            request.respondWith({
                status: 200,
                response: seasonDetails
            }).then(function () {
                expect(wrapper.vm.seasonInfo.length).toBe(2)
                done();
        });
                
        });
    });

    it("gets background image correctly", () => {
        wrapper.vm.setBackgroundImage(showDetails)
        expect(wrapper.vm.imageSrc).toBe("http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg");
      }); 

      it("no background image if show doesnt have image", () => {
        wrapper.vm.setBackgroundImage(showDetailsOriginal)
        expect(wrapper.vm.imageSrc).toBe("");
      }); 

      it("medium background image loaded if show doesnt have original image", () => {
        wrapper.vm.setBackgroundImage(showDetailsMedium)
        expect(wrapper.vm.imageSrc).toBe("http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg");
      }); 

      it("responds with error when fetching main details", (done) => {
        expect(wrapper.vm.error).toBe("")
        moxios.wait(function () {
            let request = moxios.requests.at(0);
            request.respondWith({
                status: 400,
                response: "error"
            }).then(function () {
                expect(wrapper.vm.error).not.toBe("")
                done();
        });
                
        });
    });

    it("responds with error when fetching cast details", (done) => {
        expect(wrapper.vm.error).toBe("")
        moxios.wait(function () {
            let request = moxios.requests.at(1);
            request.respondWith({
                status: 400,
                response: "error"
            }).then(function () {
                expect(wrapper.vm.error).not.toBeNull()
                done();
        });
                
        });
    });

    it("responds with error when fetching season details", (done) => {
        expect(wrapper.vm.error).toBe("")
        moxios.wait(function () {
            let request = moxios.requests.at(2);
            request.respondWith({
                status: 400,
                response: "error"
            }).then(function () {
                expect(wrapper.vm.error).not.toBeNull()
                done();
        });
                
        });
    });


    });
