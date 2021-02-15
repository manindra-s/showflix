import {mount, createLocalVue} from '@vue/test-utils';
import VueRouter from "vue-router";
import moxios from "moxios";
import Details from "../views/Details.vue";
import {routes} from "../router/index.js";


const showDetails = {
    "id": 240,
    "url": "http://www.tvmaze.com/shows/240/cops",
    "name": "Cops",
    "type": "Reality",
    "language": "English",
    "genres": ["Action", "Crime"],
    "status": "Ended",
    "runtime": 30,
    "premiered": "1989-03-11",
    "officialSite": "http://www.cops.com",
    "schedule": {
        "time": "22:30",
        "days": ["Monday"]
    },
    "rating": {
        "average": 7.8
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
    "summary": "<p><b>COPS</b> follows police officers, constables, and sheriff's deputies during patrols and various police activities by embedding camera crews with their units. The show's formula adheres to a classic <i>cinéma vérité</i> ethos. With no narration or scripted dialog, it depends entirely on the commentary of the officers and on the actions of the people with whom they come into contact.</p>",
    "updated": 1591767246,
    "_links": {
        "self": {
            "href": "http://api.tvmaze.com/shows/240"
        },
        "previousepisode": {
            "href": "http://api.tvmaze.com/episodes/1859522"
        }
    }
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

const seasonDetails = [{"id":1,"number":1,"name":"","episodeOrder":13,"premiereDate":"2013-06-24","endDate":"2013-09-16"},
{"id":2,"number":2,"name":"","episodeOrder":13,"premiereDate":"2014-06-24","endDate":"2014-09-16"}]


const localVue = createLocalVue();
localVue.use(VueRouter);

describe('Renders Details Correctly', () => {
    let wrapper;
    const router = new VueRouter({routes});
    beforeEach(()=>{
        moxios.install();
        wrapper = mount(Details, {
            localVue,
            router,
        });
    })

    afterEach(() => {
        moxios.install();
        wrapper.destroy();
      });

      it('should trigger a beforeRouteUpdate event', function () {
        const beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0];
        let nextFun = jest.fn();
        beforeRouteUpdate.call(wrapper.vm, {
            params: 123
        }, "fromObj", nextFun);
    });

    it("getting show list works", (done) => {
        expect(Object.keys(wrapper.vm.showInfo).length).toBe(0)
        expect(wrapper.vm.castInfo.length).toBe(0)
        expect(wrapper.vm.seasonInfo.length).toBe(0)

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: showDetails
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [castDetails]        
            });
        });

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: seasonDetails        
            
        }).then(function () {
            expect(Object.keys(wrapper.vm.showInfo).length).toBe(20)
            expect(wrapper.vm.castInfo.length).toBe(1)
            expect(wrapper.vm.seasonInfo.length).toBe(2)
            done();
        });
                
        });
    });
    });
