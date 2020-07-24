<template>
    <section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Reset Password
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <div class="form-group">
                    <input
                        type="text"
                        name="email"
                        v-model="form.email"
                        class="form-control form-control-lg font-14 fw-300"
                        :class="{ 'is-invalid' :form.errors.has('email') }"
                        placeholder="Email"
                    />
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="text-right">
                    <button
                        type="submit"
                        :disabled="form.busy"
                        class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
                    >
                        <span v-if="form.busy">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                        Send Reset Link
                    </button>
                </div>
                <p class="font-14 fw-400 text-center mt-4">
                    <nuxt-link to="/login" class="color-blue">
                        Back to login
                    </nuxt-link>
                </p>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            form: this.$vform({
                email: ''
            })
        }
    },
    methods: {
        submit(){

        }
    }
};
</script>
