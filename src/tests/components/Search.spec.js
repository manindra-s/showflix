import {mount, createLocalVue} from "@vue/test-utils";
import moxios from "moxios";
import Search from "@/components/Search.vue";
import VueRouter from 'vue-router'

/* eslint-disable */

const localVue = createLocalVue();
localVue.use(VueRouter)
const router = new VueRouter()

const searchResults = [{
    score: 12.796634,
    show: {
        id: 44893,
        url: "http://www.tvmaze.com/shows/44893/suit-up",
        name: "Suit Up",
        genres: ["Comedy"],
        type:"Scripted",
        premiered:"2012-09-12"
    },
},
{
    score: 12.5484705,
    show: {
        id: 5367,
        url: "http://www.tvmaze.com/shows/5367/mobile-suit-gundam-age",
        name: "Mobile Suit Gundam AGE",
        genres: ["Action","Anime","Science-Fiction","War"],
        type:"Animation",
        premiered:"2011-10-09"
    },
},
{
    score: 12.5480795,
    show: {
        id: 5365,
        url: "http://www.tvmaze.com/shows/5365/mobile-suit-gundam-seed",
        name: "Mobile Suit Gundam SEED",
        genres: ["Action","Anime","Science-Fiction","War"],
        type:"Animation",
        premiered:"2002-10-09"
    },
},
]

describe("Search performs as expected", () => {
    let wrapper;

    beforeEach(function () {
        moxios.install();

        wrapper = mount(Search, {
            localVue,
            router,
            stubs: ["router-link"],
        });
    });

    afterEach(function () {
        moxios.uninstall();
    });


    it("gets result based on search term", (done) => {
        let searchBox = wrapper.find('.search-input');
        searchBox.setValue("suits");

        moxios.wait(function () {
            let request = moxios.requests.at(0);

            request
                .respondWith({
                    status: 200,
                    response: searchResults,
                })
                .then(function () {
                    expect(wrapper.vm.results.length).toBe(3);
                    done();
                })
        }, 400);
    });

    it("no results if input search is less than 3 in length", () => {
        const mockMethod = jest.spyOn(Search.methods, 'searchShow')
        let wrapper = mount(Search)
        wrapper.find('.search-input').setValue("su");
        expect(mockMethod).not.toHaveBeenCalled()
    })

    it("errors out if no response from api after search", (done) => {
        let searchBox = wrapper.find('.search-input');
        searchBox.setValue("suits");

        moxios.wait(function () {
            let request = moxios.requests.at(0);

            request
                .respondWith({
                    status: 400,
                    response: "error",
                })
                .then(function () {
                    expect(wrapper.vm.error).not.toBeNull()
                    done();
                })
        }, 400);
    });

    it("resetting input search after clicking on the result", () => {
        wrapper.vm.handleSearch();
        expect(wrapper.vm.inputSearch).toBe("")
        expect(wrapper.vm.results.length).toBe(0);
    })

    it("cloasing result cpntainer when clicked elsewhere", () => {
        wrapper.vm.closeResult();
        expect(wrapper.vm.inputSearch).toBe("")
    })
})