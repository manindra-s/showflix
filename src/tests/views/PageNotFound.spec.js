import {mount, createLocalVue} from "@vue/test-utils";
import PageNotFound from "@/views/PageNotFound.vue";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter()

describe("PageNotFound pages display correct text", () => {
    let wrapper;
    wrapper = mount(PageNotFound,{
        localVue,
        router,
    });

    it("display page not found", () => {
        expect(wrapper.find('.error').text()).toContain( "404 - Page Not Found")
    });
})