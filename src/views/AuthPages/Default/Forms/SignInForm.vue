<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <div class="sign-in-page-data">
      <div class="sign-in-from w-100 pt-5 m-auto">
        <h1 class="mb-3 text-center">Sign in</h1>
        <form class="mt-4" novalidate @submit.prevent="handleSubmit(login)">
          <ValidationProvider
            v-slot="{ errors }"
          >
            <div class="form-group">
              <label for="emailInput" class="form-group-email"
                >Username</label
              >
              <input
                type="text"
                :class="
                  'form-control mb-0 form-group-email' +
                  (errors.length > 0 ? ' is-invalid' : '')
                "
                id="emailInput"
                v-model="user.username"
                placeholder="Enter email"
                required
              />
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            vid="password"
            name="Password"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-group">
              <label for="passwordInput" class="form-group-password"
                >Password</label
              >
              <input
                type="password"
                :class="
                  'form-control mb-0 form-group-password' +
                  (errors.length > 0 ? ' is-invalid' : '')
                "
                id="passwordInput"
                v-model="user.password"
                placeholder="Password"
                required
              />
              <div class="invalid-feedback">
                <span>{{ errors[0] }}</span>
              </div>
            </div>
          </ValidationProvider>
          <div class="sign-info">
            <button type="submit" class="btn btn-primary mb-2">Sign in</button>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-2">
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'
// import { VueJwtDecode } from 'vue-jwt-decode'
export default {
  name: 'SignInForm',
  components: {},
  data: () => ({
    user: {
      username: '',
      password: '',
      token: []
    }
  }),
  mounted () {
    localStorage.setItem('access_token', '')
    localStorage.setItem('user', '')

  },
  computed: {
    ...mapGetters({
      stateUsers: 'Setting/usersState'
    })
  },
  methods: {
    login () {
      var formData = new FormData()
      formData.append('username', this.user.username)
      formData.append('password', this.user.password)
      this.axios
        .post('auth/login', formData)
        .then((res) => {
          localStorage.setItem('access_token', res.data.token)
          this.getMyData()
        })
        .catch(() => {
          this.$swal('يرجى ادخال المعلومات الصحيحة', '', 'error')
        })
    },
    getMyData () {
      this.axios
        .get('auth/details')
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data))
          if(res.data.rule.name === 'admin'){
            this.$router.push({ name: 'dashboard.home-1' })
          }else{
            this.$swal('ليس لديك صلاحية الدخول', '', 'error')
          }
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped>
.sign-in-from h1,
.custom-control-label,
.form-group-password,
.form-group-email {
  color: rgb(27, 23, 23) !important;
}
.form-control {
  border-color: rgb(27, 23, 23) !important;
}
</style>
