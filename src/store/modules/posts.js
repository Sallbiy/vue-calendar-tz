const postsUrl = "http://localhost:3000/posts/"

export default {
    actions: {
        async fetchPosts(ctx){
            const res = await fetch(postsUrl)
            const posts = await res.json()
            this.posts = posts
            ctx.commit('updatePosts', posts)
        },
        async deletePostDb({commit}, post_id) {
            const post = await fetch(postsUrl + post_id, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(() => {
                    commit('deletePost', post_id)
                })
            return post
        }
    },
    mutations:{
        updatePosts(state, posts){
            state.posts = posts
        },
        addPost(state, post){
            fetch(postsUrl, {
              headers: {
                'content-type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify(post),
            })
            .then(() => state.posts = [...state.posts, post])
            .catch(console.error)
        },
        deletePost(state, id) {
            state.posts = state.posts.filter((post) => post.id !== id)
        },

    },
    state:{
        posts:[]
    },
    getters:{
        allPosts(state){
            return state.posts
        }
    },
}
