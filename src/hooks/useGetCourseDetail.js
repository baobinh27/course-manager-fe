import { useEffect, useState } from "react";
import { BASE_API } from "../utils/constant";

const useGetCourseDetail = (courseId) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_API}/api/course/${courseId}`);
                const data = await response.json();                

                if (!response.ok) {
                    console.log(data.message);
                    throw new Error(data.message || "Lỗi khi lấy dữ liệu khóa học");
                }

                setCourse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    return { course, loading, error };
};

export default useGetCourseDetail;