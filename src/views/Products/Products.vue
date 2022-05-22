<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-row class="justify-content-between">
        </b-row>
        <button
          type="button"
          style="margin-top:2rem"
          class="btn btn-primary add"
          @click="$bvModal.show('add')"
        >
          Add Product
        </button>
        <br />
        <!-- add category -->
        <b-modal id="add" hide-footer>
          <div class="mb-3">
            <label><span style="color: red">* </span>Name</label>
            <b-form-input
              v-model="formAdd.name"
              placeholder="Enter Title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Price</label>
            <b-form-input
              v-model="formAdd.price"
              placeholder="Enter Price"
            ></b-form-input>
          </div>
          <div class="form-group submit-form">
            <button
            class="btn btn-primary submit-button"
            type="submit"
            @click="create"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of add category -->
        <!-- edit category -->
        <b-modal id="update" hide-footer>
           
          <div class="mb-3">
            <label><span style="color: red">* </span>Name</label>
            <b-form-input
              v-model="formEdit.name"
              placeholder="Enter Title"
            ></b-form-input>
          </div>
          <div class="mb-3">
            <label><span style="color: red">* </span>Price</label>
            <b-form-input
              v-model="formEdit.price"
              placeholder="Enter Price"
            ></b-form-input>
          </div>
          <div class="form-group submit-form">
            <button
              class="btn btn-primary submit-button"
              type="submit"
              @click="update"
            >
              Submit
            </button>
          </div>
        </b-modal>
        <!-- end of edit category -->
        <!-- show image modal -->
        <div
          class="modal fade"
          style="margin-top: 10rem"
          id="showImage"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showImageLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <img :src="imageShow" alt />
            </div>
          </div>
        </div>
        <!-- end show image modal -->
        <!-- delete modal -->
        <div
          class="modal fade"
          style="margin-top: 15rem"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <h3 style="text-align: center; margin-bottom: 2rem">
                  هل حقا ترغب في حذف العنصر ؟
                </h3>
                <div class="form-group form-delete">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    id="close-delete"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <b-button
                    variant="outline-danger"
                    class="delete-btn"
                    v-on:click="deleteItem"
                    >delete</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end delete modal -->
      </b-col>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Products List</h4>
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
            <b-table-simple responsive>
              <b-thead>
                <b-th>id</b-th>
                <b-th>name</b-th>
                <b-th>price</b-th>
                <b-th>created at</b-th>
                <b-th>updated at</b-th>
                <b-th>Action</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item, index) in items" :key="index">
                  <b-td>{{ item.id }}</b-td>
                  <b-td>{{ item.name }}</b-td>
                  <b-td>{{ item.price }}</b-td>
                  <b-td>{{ item.created_at }}</b-td>
                  <b-td>{{ item.updated_at }}</b-td>
                  <b-td>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-success"
                        v-on:click="editPopup(item)"
                        size="sm"
                      >
                        <i class="ri-ball-pen-fill m-0"></i>
                      </b-button>
                    </template>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-danger"
                        data-toggle="modal"
                        data-target="#deleteModal"
                        v-on:click="deletePopup(item.id)"
                        data-whatever="@getbootstrap"
                        size="sm"
                      >
                        <i class="ri-delete-bin-line m-0"></i>
                      </b-button>
                    </template>
                    <template>
                      <b-button
                        class="custom-btn mr-2"
                        variant=" iq-bg-primary"
                        data-toggle="modal"
                        data-whatever="@getbootstrap"
                        size="sm"
                      >
                    <router-link
                      :to="{ name: 'dashboard.QR', params: { id: item.id } }"
                    >
                      GenerateQR
                    </router-link>
                      </b-button>
                    </template>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
          <b-pagination
            style="float: right"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            class="mt-4"
          >
            <template #first-text
              ><span class="text-success">First</span></template
            >
            <template #prev-text
              ><span class="text-danger">Prev</span></template
            >
            <template #next-text
              ><span class="text-warning">Next</span></template
            >
            <template #last-text><span class="text-info">Last</span></template>
            <template #ellipsis-text>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
              <b-spinner small type="grow"></b-spinner>
            </template>
            <template #page="{ page, active }">
              <b v-if="active">{{ page }}</b>
              <i v-else>{{ page }}</i>
            </template>
          </b-pagination>
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
    this.getAllItems()
},
  mounted () {
    core.index()
  },
  watch: {
    currentPage: {
      handler: function () {
        this.getAllItems()
      }
    }
  },
  data () {
    return {
      logo: '',
      loader: false,
      perPage: 4,
      currentPage: 1,
      rows: 0,
      formAdd:[],
      formEdit: [],
      items: [],
      rules: [{ text: 'Choose user rule', value: null }],
      id: null,
    }
  },
  methods: {
    deletePopup (id) {
      this.id = id
    },
    closeDeleteModal () {
      document.getElementById('close-delete').click()
    },
    editPopup (item) {
      this.formEdit = item
      this.$bvModal.show('update')
    },
    async create () {
      let data = new FormData()
      if (this.addValidater().status === 400) {
        this.$swal('خطأ في الادخال', this.addValidater().message, 'error')
      } else {
        data.append('name', this.formAdd.name)
        data.append('price', this.formAdd.price)
        this.loader = true
        await this.axios
          .post('product', data)
          .then(() => {
            this.getAllItems()
            this.loader = false
            this.$swal('تم اضافة المنتج بنجاح', '', 'success')
          })
          .catch(() => {
            this.loader = false
            this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erroe')
          })
      }
    },
    async update () {
      let data = new FormData()
        data.append('name', this.formEdit.name)
        data.append('price', this.formEdit.price)
      data.append('_method', 'PUT')
      this.loader = true
      await this.axios
        .post(`product/${this.formEdit.id}`, data)
        .then(() => {
          this.getAllItems()
          this.$bvModal.hide('update')
          this.loader = false
          this.$swal('تم تعديل معلومات المنتج بنجاح', '', 'success')
        })
        .catch(() => {
          this.loader = false
          this.$swal('حدث خطأ فني يرجى المحاولة لاحقا', '', 'erorr')
        })
    },
    getAllItems () {
      this.axios
        .get(`product?take=${this.perPage}&page=${this.currentPage}`)
        .then((res) => {
          this.items = res.data.data
          this.rows = res.data.total
          this.loader = false 
        })
        .catch(() => {
          this.loader = false 
        })
    },
    deleteItem () {
      this.loader = true
      this.axios
        .delete(`product/${this.id}`)
        .then((res) => {
          this.closeDeleteModal()
          this.getAllItems()
          this.loader = false
        })
        .catch((res) => {
          this.loader = false
          if (res.response.status === 404) {
            this.$swal('العنصر غير موجود', '', 'error')
          }
          this.$swal('يوجد خلل فني', '', 'error')
        })
    },
    addValidater () {
      let dataError = {
        status: null,
        message: ''
      }
      if (!this.formAdd.name) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة اسم المنتج '
        return dataError
      }
      if (!this.formAdd.price) {
        dataError.status = 400
        dataError.message = 'يرجى اضافة سعر المنتج '
        return dataError
      }
      dataError.status = 200
      dataError.message = 'success'
      return dataError
    },
  }
}
</script>
<style scoped>
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
</style>
