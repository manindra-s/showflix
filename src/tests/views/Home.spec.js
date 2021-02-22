import {mount} from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import moxios from "moxios";
import Home from "@/views/Home.vue";

/* eslint-disable */

const shows = [{
        "id": 1,
        "name": "Under the Dome",
        "language": "English",
        "rating": {
            "average": 6.5
        },
        "genres":["Drama","Thriller"],
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
        },
    },
    {
        "id": 2,
        "name": "The Wire",
        "language": "English",
        "rating": {
            "average": 8.3
        },
        "genres":["Crime","Drama"],
        "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
        },
    },
]

const showsSorted = [
{
  "id": 2,
  "name": "The Wire",
  "language": "English",
  "rating": {
      "average": 8.3
  },
  "genres":["Crime","Drama"],
  "image": {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
  },
},
{
  "id": 1,
  "name": "Under the Dome",
  "language": "English",
  "rating": {
      "average": 6.5
  },
  "genres":["Drama","Thriller"],
  "image": {
      "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      "original": "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
  },
},
]


describe('Renders Home Correctly', () => {
    let wrapper;
    beforeEach(()=>{
        moxios.install();
        wrapper = mount(Home, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
    })

    afterEach(() => {
        moxios.uninstall();
        wrapper.destroy();
      });

    it('displays Header Component correctly', () => {
        expect(wrapper.findComponent({name:"Header"}).exists()).toBe(true);
    })

    it('check api response and state update', (done) => {
      const mockMethod = jest.spyOn(Home.methods, 'sortShows')
      moxios.wait(function () {
        let request = moxios.requests.at(0)
        request.respondWith({
          status: 200,
          response: shows
        }).then(function () {
            expect(wrapper.vm.shows.length).toBe(2);
            expect(wrapper.findComponent({name:"MainCard"}).exists()).toBe(true);
            done()
         })
      })
    })

  it('test to check api error response', (done) => {
    const mockMethod = jest.spyOn(Home.methods, 'sortShows')
    moxios.wait(function () {
      let request = moxios.requests.at(0)
      request.respondWith({
        status: 400,
        response: "error"
      }).then(function () {
        expect(wrapper.vm.error).not.toBeNull();
        expect(mockMethod).toHaveBeenCalled()
        done()
      })
    })
  })

  it("sorts shows correctly", () => {
    wrapper.setData({
      shows: shows,
    });
    let result = wrapper.vm.sortShows(shows)
    expect(result).toEqual(showsSorted);
  }); 

  it("sorts shows correctly if shows are already in correct order", () => {
    wrapper.setData({
      shows: showsSorted,
    });
    let result = wrapper.vm.sortShows(shows)
    expect(result).toEqual(showsSorted);
  }); 
})