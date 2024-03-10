import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { Spinner, Alert } from "react-bootstrap";
import { useUser } from '../auth/UserContext';

const GetCourseUsers = () => {
    const { userCourse } = useUser();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState("");
    const { data: usersData, isLoading: usersLoading, error: usersError, fetchData } = useFetch();

    useEffect(() => {
        setIsLoading(true);
        const fetchUsersForCourse = async (course) => {
            const getCourseStudentsApiUrl = `https://localhost:7252/api/Course/${course.id}/course-users`;
            await fetchData(getCourseStudentsApiUrl);
        };

        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const promises = userCourse?.map(course => fetchUsersForCourse(course));
                await Promise.all(promises);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [userCourse, fetchData]);

    useEffect(() => {
        if (usersData) {
            setUsers(usersData);
        }
    }, [usersData]);


    const filteredData = useFilterableTable(users, filterText);

    return (
        <div>
            {(isLoading || usersLoading) && <Spinner animation="border" />}
            {(error || usersError) && <Alert variant="danger">Error: {error || usersError}</Alert>}
            {usersData && (
                <div>
                    <SearchBar filterText={filterText} setFilterText={setFilterText} />
                    <DataTable data={filteredData}  />
                </div>
            )}
        </div>
    );
};

export default GetCourseUsers;
