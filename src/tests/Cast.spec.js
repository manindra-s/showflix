import {mount} from '@vue/test-utils';
import Cast from "../components/Cast.vue";

describe('Renders Cast Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        const castDetails = [
            {
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
            }]
        wrapper = mount(Cast, {
            propsData: {
                castInfo: castDetails
            },
        })
    })

    afterEach(() => {
        wrapper.destroy();
    });

        it('displays name correctly', () => {
            expect(wrapper.find('.cast-name').text()).toContain('Justin Roiland')
        })
        it('displays image correctly', () => {
            expect(wrapper.find('.cast-image').attributes("src")).toBe("http://static.tvmaze.com/uploads/images/original_untouched/1/3602.jpg")
        })
    })

