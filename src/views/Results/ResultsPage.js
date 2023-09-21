import SideBar from '@/components/sidebar/SideBar';
import axios from 'axios';

export default {
    data () {
        return {
            results: [],
            headers: ['ID', 'Student ID', 'Name', 'Exam', 'Mark'],
        }
    },
    created() {
        this.get_results()
    },
    methods: {
        async get_results() {
            await axios.get('/exam/results/')
            .then((res) => {
                this.results = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    components: {
        SideBar
    }
}