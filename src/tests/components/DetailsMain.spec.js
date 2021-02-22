import {mount} from '@vue/test-utils';
import DetailsMain from "@/components/DetailsMain.vue";

describe('Renders main details Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        const showDetails = {
            "id": 180,
            "url": "http://www.tvmaze.com/shows/180/firefly",
            "name": "Firefly",
            "type": "Reality",
            "language": "English",
            "genres": ["Action", "Crime"],
            "status": "Ended",
            "runtime": 30,
            "premiered": "2001-03-11",
            "officialSite": "http://www.firefly.com",
            "rating": {
                "average": 8.5
            },
            "image": {
                "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
                "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/4185.jpg"
            },
            "summary": "<p>Some Summary</p>",
        }
        wrapper = mount(DetailsMain, {
            propsData: {
                showInfo: showDetails
            },
        })
    })

    afterEach(() => {
        wrapper.destroy();
    });

        it('displays show name correctly', () => {
            expect(wrapper.find('.show-name').text()).toContain('Firefly')
        })
        it('displays show status correctly', () => {
            expect(wrapper.find('.show-status').text()).toContain('Status: Ended')
        })
        it('displays show genres correctly', () => {
            expect(wrapper.find('.show-genres').text()).toContain('Action | Crime')
        })
    })
