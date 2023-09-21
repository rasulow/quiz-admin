import SideBar from '@/components/sidebar/SideBar';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            headers: ['ID', 'Name', 'Actions'],
            subjects: [],
            drawer: null,
            subject: null,
            Toast: Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
        }
    },
    created() {
        this.getSubjects()
    },
    methods: {
        async getSubjects() {
            await axios.get('/subject/')
            .then((res) => {
                this.subjects = res.data;
                console.log(this.subjects)
            })
            .catch((err) => {
                console.log(err);
            })
        },

        async addSubject() {
            if (this.subject === null) {
                this.Toast.fire({
                    icon: 'error',
                    title: 'Subject cannot be empty'
                })
            } else {
                await axios.post('/subject/', {
                    name: this.subject
                })
                .then(() => {
                    this.Toast.fire({
                        icon: 'success',
                        title: 'Succesfully saved',
                    })
                    this.drawer = !this.drawer
                    this.getSubjects()
                })
                .catch((err) => {
                    console.log(err)
                    this.Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                    })
                    this.subject = null
                })
            }
        },

        async deleteSubject(id) {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#7FBA5E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/subject/' + id + '/')
                    .then(() => {
                        this.Toast.fire({
                            icon: 'success',
                            title: 'Deleted!',
                        })
                        this.getSubjects()
                    })
                    .catch((err) => {
                        console.log(err)
                        this.Toast.fire({
                            icon: 'error',
                            title: 'Something went wrong!',
                        })
                    })
                }
            })
        }
    },  
    components: {
        SideBar
    },
    setup() {
    }
}