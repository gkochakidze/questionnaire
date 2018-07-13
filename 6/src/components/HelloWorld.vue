<template>
  <div class="ui grid">
    <div class="row" style="padding: 2rem 1rem 0rem;">
      <div class="four wide column">
        <label>Limit: </label>
        <select v-model="limit" v-on:change="onLimitChange" class="ui selection dropdown">
          <option class="item" value="10">10</option>
          <option class="item" value="25">25</option>
          <option class="item" value="50">50</option>
          <option class="item" value="100">100</option>
        </select>
      </div>
      <div class="four wide column">
        <label>Page: </label>
        <select v-model="page" v-on:change="onPageChange" class="ui selection dropdown">
          <option class="item" v-for="page in getPages()" :key="page" v-bind:value="page">{{page + 1}}</option>
        </select>
      </div>
      <div class="eight wide column">
        <div class="ui icon input" style="float: right">
          <input v-model="searchTerm" v-on:input="onSearchTermChange" type="text" placeholder="Search.."><i class="search icon"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="sixteen wide column">
        <table class="ui sortable celled fixed table">
          <thead>
            <tr>
              <th v-on:click="onSortKeyChange('albumId')" v-bind:class="{ 'sorted ascending': sortKey === 'albumId' && sortDir === 1, 'sorted descending': sortKey === 'albumId' && sortDir === -1 }">Album Id</th>
              <th v-on:click="onSortKeyChange('albumTitle')" v-bind:class="{ 'sorted ascending': sortKey === 'albumTitle' && sortDir === 1, 'sorted descending': sortKey === 'albumTitle' && sortDir === -1 }">Album Title</th>
              <th v-on:click="onSortKeyChange('title')" v-bind:class="{ 'sorted ascending': sortKey === 'title' && sortDir === 1, 'sorted descending': sortKey === 'title' && sortDir === -1 }">Photo Title</th>
              <th>Photo thumbnail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="photo in pagePhotos" :key="photo.id">
              <td>{{photo.albumId}}</td>
              <td>{{photo.albumTitle}}</td>
              <td>{{photo.title}}</td>
              <td><img width="150" height="150" v-bind:src="photo.thumbnailUrl"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="4">
                <div class="ui right floated pagination menu">
                  <a class="icon item"><i class="left chevron icon"></i></a>
                  <a class="item">1</a>
                  <a class="item">2</a>
                  <a class="item">3</a>
                  <a class="item">4</a>
                  <a class="icon item"><i class="right chevron icon"></i></a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      sortKey: '',
      sortDir: 0,
      searchTerm: '',
      limit: 25,
      offset: 0,
      page: 0,
      photos: [],
      searchedPhotos: [],
      pagePhotos: []
    }
  },
  mounted () {
    Promise.all([
      this.$http.get('https://jsonplaceholder.typicode.com/photos'),
      this.$http.get('https://jsonplaceholder.typicode.com/albums')
    ]).then(([{body: photos}, {body: albums}]) => {
      let albumsMap = albums.reduce((map, album) => ({...map, [album.id]: album}), {})
      let photosWithAlbums = photos.map((photo) => ({...photo, albumTitle: albumsMap[photo.albumId].title}))
      this.photos = photosWithAlbums
      this.searchedPhotos = photosWithAlbums
      this.pagePhotos = this.searchedPhotos.slice(this.page * this.limit, (this.page + 1) * this.limit)
    })
  },
  methods: {
    onLimitChange: function () {
      this.page = 0
      this.pagePhotos = this.searchedPhotos.slice(this.page * this.limit, (this.page + 1) * this.limit)
    },
    onSearchTermChange: function () {
      if (!this.searchTerm) {
        this.searchedPhotos = this.photos
      } else {
        this.searchedPhotos = this.photos.filter(({title, albumTitle}) => {
          return title.startsWith(this.searchTerm) || albumTitle.startsWith(this.searchTerm)
        })
      }
      this.page = 0
      if (this.sortKey) {
        this.searchedPhotos = this._.orderBy(this.searchedPhotos, this.sortKey, this.sortDir === 1 ? 'asc' : 'desc')
      }
      this.pagePhotos = this.searchedPhotos.slice(this.page * this.limit, (this.page + 1) * this.limit)
    },
    onSortKeyChange: function (sortKey) {
      if (this.sortKey && this.sortKey === sortKey) {
        this.sortDir = this.sortDir ? 0 - this.sortDir : 1
      } else {
        this.sortKey = sortKey
        this.sortDir = 1
      }
      this.searchedPhotos = this._.orderBy(this.searchedPhotos, this.sortKey, this.sortDir === 1 ? 'asc' : 'desc')
      this.pagePhotos = this.searchedPhotos.slice(this.page * this.limit, (this.page + 1) * this.limit)
    },
    onPageChange: function () {
      this.pagePhotos = this.searchedPhotos.slice(this.page * this.limit, (this.page + 1) * this.limit)
    },
    getPages: function () {
      return this._.repeat('a', Math.ceil(this.searchedPhotos.length / this.limit)).split('').map((val, i) => i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tbody {
    display: block;
    height: 100%;
    width: 100vw;
    overflow: auto;
}
thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
thead {
  width: calc( 100% - 1em );
  display: table-header-group;
}
table {
  height: calc(100vh - 66px);
  width: 100%;
}
</style>
