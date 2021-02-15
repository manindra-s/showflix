import {shallowMount} from "@vue/test-utils";
import PageNotFound from "../views/PageNotFound.vue";

describe("PageNotFound pages display correct text", () => {
    let wrapper;
    wrapper = shallowMount(PageNotFound);

    it("display page not found", () => {
        expect(wrapper.find('h1').text()).toContain( "404 - Page Not Found")
    });
})