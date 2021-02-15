import {mount} from '@vue/test-utils';
import SeasonDetails from "../components/SeasonDetails.vue";

describe('Renders Season Details Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        const seasonDetails = [
            {"id":1,"number":1,"name":"","episodeOrder":13,"premiereDate":"2013-06-24","endDate":"2013-09-16"}]
        wrapper = mount(SeasonDetails, {
            propsData: {
                seasonInfo: seasonDetails
            },
        })
    })

    afterEach(() => {
        wrapper.destroy();
    });

        it('displays title correctly', () => {
            expect(wrapper.find('.season-title').text()).toContain('Season 1')
        })
        it('displays episode count correctly', () => {
            expect(wrapper.find('.episode').text()).toContain('13')
        })
        // it('displays name correctly', () => {
        //     expect(wrapper.find('.season-title').text()).toContain('Season 1')
        // })
    })
