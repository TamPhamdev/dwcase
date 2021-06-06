<template>
  <div
    class="recent recent-wrapper"
    style="height: 100%;"
  >
    <nuxt-link
      to="/"
      class="recent__item-live flex justify-center relative"
    >
      <img :src="lists[random].url">
      <div class="recent__item-info absolute">
        <p class="recent__item-info-name">Name</p>
        <p class="recent__item-info-user">User</p>
        <p class="recent__item-info-type">Type</p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "RecentItem",
    data () {
      return {
        lists: [

          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0vL3ZDBSuImJmY-EmeX9IL7uhX5f-8BlteXI8oThxgLnqBVuZGCiIoDBewM5ZF-G_gfrl7vrjJ7utJTNwXJqvCYq7XjdlxapwUYbQ8Jk1rE/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf1OD3djFN79fnzL-KgPbmN4Tck29Y_chOhujT8om721DjqBU4YW72IoTAdwdqMFvY_1W3ye_sgpa878jPy3o27HUr5yuLyQv3308XfsBUmA/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0vL3ZDBSuImJmY-EmeX9IL7uhX5f-8BlteTE8YXghRq1-hU_YWCiI4Oddw46aAnX_Ve_wOfu1sS06cjBwCQ36SMl5SvezBy_n1gSOfEuqrPZ/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf1OD3ZDBS0920jZOYqPv9NLPFqWdQ-sJ0xLyUrN2l2g3sqkU-NmChJIGUcwM4NA7R_Vfvwu-7h5C8vJqdwHA3unY8pSGKnKFTvB4/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JkIGZnOD9PbzummJW4NFOhujT8om7jg23-ENuYW76ddDAIFJqY1rR-VW6l7_qjMC7v5WfwHFivXRx4X7fnQv330_a99p--w/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jxP77Wl2VF18l4jeHVyoD0mlOx5UdtZT_1JIHGIQNoMA2C_1PslO65h5Tpvc_AwXZmuiMr5CnZmhfm0hpSLrs4U9WKdHc/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAR17P7YJnBB49G7lY6PkuXLPr7Vn35c18lwmO7Eu9333AOx_hA4ZGmnLYPHIFA9MF_UrFC9xuzt1JK7u5nAynA2unZ253_D30vg60XbqNw/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf1OD3cicVueOihoWKk8j4OrzZglRd6dd2j6eZ9t6i3lC2_EBsMTvwJ4KSdVdvMF3SrFbvw-3nh5PqvpTMnHNnuSYm-z-DyPgNL0S6/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jkIbTWhG5C-8xnteXI8oTht1i1uRQ5fWDyd9LAdQ4_MgzQqVm7wey918TuupufynUw6Sd05C2MyRfmgBgfbuBxxavJa8F12Qc/image.png?size=93x70'
          },

          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLddgJN_t24k4W0g-X9MrXWmm5u5cB1g_zMyoD0mlOx5RVvNm6gcdeRJwI4Yl2DqVTrk7q818W_tJXNmyY17iYg53bbzhy0iUpSLrs4XSQiJ_c/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLddgJN_t24k4W0g-X9MrXWmm5u5Mx2gv3--Y3nj1H6_EpvNjvzIdPGegI_MlrW_FXsyernh5O6ucjMnXJrunMl5n6JmUDk1QYMMLIfqDFVuQ/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7P7NYjV9-N24q42Ok_7hPoTdl3lW7Yt3iOuRrdT32wPk-UI9YW_xJo_HewJoZwuE8lbryejsh5bv7ZmYmiFjpGB8shCX1QG8/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRfwOP3dzxP7c-Jk4iEhOPLOrXCk2hF-_p9g-7J4cKi2gO3_Bc-YD_1cNCRI1draQrW81Pox-fpg8Lu7ZnPySMw63Zw5XiLgVXp1i6TS7Ag/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAR17P7YJnBB49G7lY6PkuXLP7LWnn9u5MRjjeyPp9qljAey-URqZjr7J9CSd1NvNQmD_wDslei605K9tJqcmHAwuCAq7GGdwUJMw04E0g/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b0963mYKEmMj4OrzZgiUDvMEp07GX9tikjgfg_xdkMGimLYeTdVc3Yl2D_QO3werogJHqtJic1zI97SuSa_L0/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBSuImJgZCZmPbmDLfYkWNF18lwmO7Eu9yhi1Ds_0BuYzr3J4GVIFVrNVnUq1K3yee9hcO9uJyanyRlvXVx7XfD30vggrNaWnM/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRfwOP3fDhR5OO-m5S0lvnwDLjemm9u5Mx2gv3--Y3nj1H6qEpvMm7zJNTHcVVoZQzR_lO6wLrs1p6_u5jPwCBmvSEk7XqPn0e1iAYMMLIMy9qjNA/image.png?size=93x70'
          },
          {
            url: 'https://cdn.farmskins.com/steam/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7P7NYjV9-N24q42Ok_7hPoTdl3lW7Yt3iOuRrdT32wPk-UI9YW_xJo_HewJoZwuE8lbryejsh5bv7ZmYmiFjpGB8shCX1QG8/image.png?size=93x70'
          }
        ],
      }
    },
    computed: {
      random () {
        return Math.floor((Math.random() * 17) + 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/_variables.scss';
  .recent {
    &__item-live {
      background-size: 100% 100%;
      user-select: none;
      background-image: url('~@/assets/images/bg-recent.png');
      img {
        filter: drop-shadow(0 0 14px rgba(211, 44, 230, 0.5));
      }

      // &:hover > .recent__item-info {
      //   transition: all 0.2s;
      //   opacity: 1;
      // }
    }
    &__item-info {
      overflow: hidden;
      opacity: 0;
      text-overflow: ellips;

      &-name {
        color: $main-text-color;
      }
      &-user {
        color: $primary-color;
      }
      &-type {
        color: $sub-text-color;
      }
    }
  }
</style>
