<template>
    <div class="setting-block">
        <div class="setting-title font-16 fw-500">My Questions</div>

        <div class="setting-body white-bg-color">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <td style="width: 25%">Title</td>
                        <td style="width: 65%">Content</td>
                        <td style="width: 10%">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in questions" :key="question.id">
                        <td>{{ question.title }}</td>
                        <td>{{ question.body }}</td>
                        <td>
                            <nuxt-link :to="{name: 'questions.edit', params: { id: question.id }}">Edit</nuxt-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    middleware: ['auth'],
    data(){
        return {
            questions: []
        }
    },
    created(){
        this.fetchUserQuestions();
    },
    methods:{
        async fetchUserQuestions(){
            const {data} = await this.$axios.$get(`/users/${this.$auth.user.id}/questions`);
            this.questions = data;
        }
    }
};
</script>
