<template>
  <div>
    <InfoCard
      :avatar="user.avatar"
      :name="user.name"
      :permissions="
        user.role ? (user.role == 1 ? '超级管理员' : '管理员') : '普通用户'
      "
      :id="user.id"
      :gender="user.gender ? 'pink' : 'skyblue'"
      :onButtonClick="onButtonClick"
    />
    <van-form @submit="permission">
      <van-field
        readonly
        clickable
        label="权限授权"
        :value="value"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择权限' }]"
        v-model="value"
        size="large"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          title="权限组"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <div style="margin: 10px">
        <van-button round block type="info" native-type="submit"
          >授权</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Popup, Area, Picker, Toast } from 'vant'
import InfoCard from '@/components/UserInfoCard/UserInfoCard.vue'
import { CancelPermission, AuthAdminPermission } from '@/api/admin'
export default {
  data() {
    return {
      user: undefined,
      value: '',
      showPicker: false,
      message: '',
      columns: ['超级管理员', '管理员', '普通用户'],
    }
  },
  components: {
    InfoCard,
    [Field.name]: Field,
    [Form.name]: Form,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
  },
  created() {
    this.getUserData()
  },
  mounted() {},
  methods: {
    // 优化前
    // getUserData() {
    //   // 管理
    //   const AdminList = JSON.parse(localStorage.getItem('AdminList'))
    //   const UserList = JSON.parse(localStorage.getItem('UserList'))
    //   AdminList.forEach((admin) => {
    //     if (admin.id == this.$route.query.id) {
    //       this.user = admin
    //     }
    //   })
    //   if (this.user === undefined) {
    //     UserList.forEach((user) => {
    //       if (user.id == this.$route.query.id) {
    //         this.user = user
    //       }
    //     })
    //   }
    // },

    getUserData() {
      const AdminList = JSON.parse(localStorage.getItem('AdminList'))
      const UserList = JSON.parse(localStorage.getItem('UserList'))
      this.user = AdminList.find((admin) => admin.id == this.$route.query.id)
      if (!this.user) {
        this.user = UserList.find((user) => user.id == this.$route.query.id)
      }
    },

    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },

    onCancel() {
      Toast('取消')
      this.showPicker = false
    },
    // 授权
    permission() {
      if (this.value === '超级管理员') {
        // 超级管理员
        AuthAdminPermission(this.$route.query.id, 1).then((res) => {
          if (res.data.status === 1) {
            Toast.success(res.data.msg)
          } else {
            Toast.fail(res.data.msg)
          }
          location.reload()
        })
      } else if (this.value === '管理员') {
        // 管理员
        AuthAdminPermission(this.$route.query.id, 2).then((res) => {
          if (res.data.status === 1) {
            Toast.success(res.data.msg)
          } else {
            Toast.fail(res.data.msg)
          }
          location.reload()
        })
      } else {
        // 普通用户
        CancelPermission(this.$route.query.id).then((res) => {
          if (res.data.status === 1) {
            Toast.success(res.data.msg)
          } else {
            Toast.fail(res.data.msg)
          }
          location.reload()
        })
      }
    },

    permission() {
      let permissionType
      let permissionPromise

      if (this.value === '超级管理员') {
        // 超级管理员
        permissionType = 1
        permissionPromise = AuthAdminPermission(
          this.$route.query.id,
          permissionType
        )
      } else if (this.value === '管理员') {
        // 管理员
        permissionType = 2
        permissionPromise = AuthAdminPermission(
          this.$route.query.id,
          permissionType
        )
      } else {
        // 普通用户
        permissionPromise = CancelPermission(this.$route.query.id)
      }
      permissionPromise.then((res) => {
        if (res.data.status === 1) {
          Toast.success(res.data.msg)
        } else {
          Toast.fail(res.data.msg)
        }
        location.reload()
      })
    },

    onButtonClick() {},
  },
}
</script>

<style></style>
