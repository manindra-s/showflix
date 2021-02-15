import {mount, createLocalVue} from "@vue/test-utils";
import moxios from "moxios";
import Search from "../components/Search.vue";
import VueRouter from 'vue-router'

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

    it("has a search input", () => {
        let searchBox = wrapper.find('input[type="text"]');
        expect(searchBox.exists()).toBe(true);
    })

    it("input data is correct", () => {
        let searchBox = wrapper.find('input[type="text"]');
        searchBox.setValue("suits");
        expect(wrapper.vm.inputSearch).toBe("suits");
    })

    it("gets result based on search term", (done) => {
        let searchBox = wrapper.find('input[type="text"]');
        searchBox.setValue("suits");

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request
                .respondWith({
                    status: 200,
                    response: searchResults,
                })
                .then(function () {
                    expect(wrapper.vm.results.length).toBe(3);
                    done();
                })
        }, 600);
    });

    it("no results if input search is less than 3 in length", () => {
        const mockMethod = jest.spyOn(Search.methods, 'searchShow')
        let wrapper = mount(Search)
        wrapper.find('input[type="text"]').setValue("su");
        expect(mockMethod).not.toHaveBeenCalled()
    })

    // it("handleSearch called on result click", () => {
    //     const mockMethod = jest.spyOn(Search.methods, 'handleSearch')
    //     let wrapper = mount(Search)
    //     wrapper.setData({
    //         inputSearch: "suit",
    //         results: searchResults,
    //         loading: false
    //       });
    //     wrapper.find('.data-result').trigger('click');
    //     expect(mockMethod).toHaveBeenCalled()
    // })

    it("errors out if no response from api", (done) => {
        let searchBox = wrapper.find('input[type="text"]');
        searchBox.setValue("suits");

        moxios.wait(function () {
            let request = moxios.requests.mostRecent();

            request
                .respondWith({
                    status: 400,
                    response: "error",
                })
                .then(function () {
                    expect(wrapper.vm.error).not.toBeNull()
                    done();
                })
        }, 600);
    });

    it("resetting input search after clicking on the result", () => {
        wrapper.vm.handleSearch();
        expect(wrapper.vm.inputSearch).toBe("")
    })

    it("cloasing result cpntainer when clicked elsewhere", () => {
        wrapper.vm.closeResult();
        expect(wrapper.vm.inputSearch).toBe("")
    })
})