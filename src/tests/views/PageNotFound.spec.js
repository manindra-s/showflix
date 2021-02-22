import {mount} from "@vue/test-utils";
import PageNotFound from "@/views/PageNotFound.vue";
import { RouterLinkStub } from '@vue/test-utils';

describe("PageNotFound pages display correct text", () => {
    let wrapper;
    wrapper = mount(PageNotFound,{
        stubs: {
            RouterLink: RouterLinkStub
        }
    });

    it("display page not found", () => {
        expect(wrapper.find('h1').text()).toContain( "404 - Page Not Found")
    });
})