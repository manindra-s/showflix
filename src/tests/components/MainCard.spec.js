import {mount} from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import MainCard from "@/components/MainCard.vue";

describe('Renders MainCard Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        const popularShows = [{
            "id": 1,
            "name": "Under the Dome",
            "language": "English",
            "rating": {
                "average": 6.5
            },
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
            },
        }]
        wrapper = mount(MainCard, {
            propsData: {
                popularShows
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
    })

    afterEach(() => {
        wrapper.destroy();
      });

    it('displays name correctly', () => {
        expect(wrapper.find('.data-name').text()).toContain('Under the Dome')
    })
    it('displays language correctly', () => {
        expect(wrapper.find('.data-language').text()).toContain('English')
    })
    it('displays rating correctly', () => {
        expect(wrapper.find('.data-rating').text()).toContain('6.5')
    })
})