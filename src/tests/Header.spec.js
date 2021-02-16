import {mount} from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import Header from "../components/Header.vue";

describe('Renders Header Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(Header, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
    })

    afterEach(() => {
        wrapper.destroy();
      });

    it('displays logo correctly', () => {
        expect(wrapper.find('h1').text()).toContain('ShowFlix')
    })
    it('displays Search Component correctly', () => {
        expect(wrapper.findComponent({name:"Search"}).exists()).toBe(true);
    })
})