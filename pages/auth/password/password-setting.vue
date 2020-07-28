<template>
    <section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Change Password
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                    Password successfully updated
                </alert-success>
                <div class="form-group">
                    <base-input
                        :form="form"
                        inputType="password"
                        field="password"
                        v-model.trim="form.current_password"
                        placeholder="Current Password"
                    ></base-input>
                </div>

                <div class="form-group">
                    <base-input
                        :form="form"
                        inputType="password"
                        field="password"
                        v-model.trim="form.password"
                        placeholder="New Password"
                    ></base-input>
                </div>

                <div class="form-group">
                    <base-input
                        :form="form"
                        inputType="password"
                        field="password_confirmation"
                        v-model.trim="form.password_confirmation"
                        placeholder="Confirm New Password"
                    ></base-input>
                </div>
                <div class="text-right">
                    <base-button :loading="form.busy">
                        Change Password
                    </base-button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    middleware: ['auth'],
    data(){
        return {
            status: '',
            form: this.$vform({
                current_password: '',
                password: '',
                password_confirmation: '',
            })
        }
    },
    methods: {
        submit(){
            this.form.put('/settings/password')
            .then(res => {
                this.status = res.data.status;
                this.form.reset();
            }).catch(e => {
                console.log(e)
            })
        }
    }
};
</script>
