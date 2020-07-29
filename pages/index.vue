<template>
    <div class="container">
        <base-question
            v-for="question in questions"
            :key="question.id"
            :question="question"
        ></base-question>
    </div>
</template>

<script>
export default {
    data(){
        return {
            questions: []
        }
    },
    created(){
        this.fetchQuestions();
    },
    methods:{
        async fetchQuestions(){
            const {data} = await this.$axios.$get('/questions');
            this.questions = data;
        }
    }
}
</script>
