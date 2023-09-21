<template>
    <v-app style="background-color: #faf9f7;">
        <div class="d-flex justify-center">
        <SideBar/>
        <v-img 
            v-if="results.status_code == 204"
            src="@/assets/no-data.svg"
            style="position: absolute;width: 50%"
        />
        <v-container fluid style="padding: 30px 100px 0px 100px;">
            <v-row no-gutters class="mt-2 mb-5">
                <div style="color: #323b50; font-size: 25px" v-if="results.length > 0">Results</div>
            </v-row>
            <v-simple-table dense v-if="results.length > 0" style="background-color: #faf9f7;">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th
                                v-for="(item, i) in headers"
                                :key="i"
                            >
                                {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, i) in results" 
                            :key="i"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.student_id }}</td>
                            <td>{{ item.student.name }}</td>
                            <td>{{ item.exam.name }}</td>
                            <td>{{ item.mark }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
    </v-app>
</template>

<script src="./ResultsPage.js"/>

<style scoped src="./ResultsPage.css">