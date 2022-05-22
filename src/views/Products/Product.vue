<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
          
        </b-row>
        <br />
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Products Details</h4>
          </template>
          <template v-slot:headerAction>
            <a
              class="text-primary float-right"
              v-b-toggle.collapse-10
              role="button"
            >
              <i class="ri-code-s-slash-line" />
            </a>
          </template>
          <template v-slot:body>
            <b-collapse id="collapse-10" class="mb-2">
              <div class="card">
                <kbd class="bg-dark"></kbd>
              </div>
            </b-collapse>
             <div class="mb-3">
            <label><span style="color: red">* </span>Name</label>
            <b-form-input
              v-model="productName"
              placeholder="Enter Title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Price</label>
            <b-form-input
              v-model="productPrice"
              placeholder="Enter Price"
            ></b-form-input>
          </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <loader v-if="loader" />
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
import Loader from '../../components/core/loader/NewLoader.vue'
export default {
  name: 'Products',
  components: { Loader },
  created () {
    this.getProductById()
},
  mounted () {
    core.index()
    this.getProductById()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getProductById()
      }
    }
  },
  data () {
    return {
      loader: false,
      productName: '',
      productPrice: '',
    }
  },
  methods: {
    getProductById () {
      this.axios
        .get(`product/${this.$route.params.id}`)
        .then((res) => {
          this.productName = res.data.name
          this.productPrice = res.data.price
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style>
.custom-btn mr-2 {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-url {
  width: 4rem !important;
  height: 4rem !important;
}
.add {
  margin-bottom: 1rem !important;
}
.submit-button {
  margin: 0.5rem !important;
}
.submit-form {
  float: right;
}
.delete-btn {
  margin-left: 1rem !important;
}
.form-delete {
  margin-left: 11rem;
}
.iq-sidebar{
  display: none;
}
.iq-top-navbar{
  display: none !important;
}
</style>
