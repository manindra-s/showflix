import {shallowMount, mount} from '@vue/test-utils';
import { RouterLinkStub } from '@vue/test-utils';
import moxios from "moxios";
import Home from "../views/Home.vue";

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

const genres = ["Drama","Thriller","Crime"]

const genreShows = [{
  title: "Drama",
  shows: [
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
},
{
  title: "Thriller",
  shows: [
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
    }
  ]
},{
  title: "Crime",
  shows: [{
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
    },}
  ]
}]

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
        moxios.install();
        wrapper.destroy();
      });

    it('displays Header Component correctly', () => {
        expect(wrapper.findComponent({name:"Header"}).exists()).toBe(true);
    })

    it('test to check api', (done) => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: shows
      }).then(function () {
        expect(wrapper.vm.shows.length).toBe(2);
        console.log(wrapper.vm.popularShows)
        expect(wrapper.vm.popularShows.length).toBe(1);
        done()
      })
    })
  })

  it("sorts shows correctly", () => {
    wrapper.setData({
      shows: shows,
    });
    expect(wrapper.vm.sortShows(shows)).toStrictEqual(showsSorted);
  }); 

  it("gets genres correctly", () => {
    wrapper.setData({
      shows: shows,
    });
    expect(wrapper.vm.genreTitles).toStrictEqual(genres);
  });
  it("gets shows by genres correctly", () => {
    wrapper.setData({
      shows: shows,
    });
    expect(wrapper.vm.showGenres).toStrictEqual(genreShows);
  });

  it("does not render MainCard component if no popularshows", () => {
    wrapper.setData({
      popularShows: [],
    });
    expect(wrapper.findComponent({name:"MainCard"}).exists()).toBe(false);
  });
})