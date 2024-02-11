import { Form, Button, Stack } from 'react-bootstrap';

import { Tab, Tabs, Table } from 'react-bootstrap';

import { BiLayerPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import { useNavigate } from 'react-router-dom';

import CalendarHeatmap from 'react-calendar-heatmap';
import { getHeatmapData, getRecentAnswers, getUserBookmarks } from '../utils';

export const ProfilePage = () => {
    const user = sessionStorage.getItem('user');
    const user_fid = sessionStorage.getItem('user_fid');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [heatmapData, setHeatmapData] = useState([]);
    const [recentAnswers, setRecentAnswers] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);


    const submitForm = () => {
        const form = document.getElementById('form_to_submit');
        const formData = new FormData(form);
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);

        }
        console.log(data);
        handleClose();
    }
    const [tabKey, setTabKey] = useState('Tab0');
    useEffect(() => {
        const fetchData = async () => {
            const heatmapData = await getHeatmapData(user_fid);
            const recentAnswers = await getRecentAnswers(user_fid);
            const userBookmarks = await getUserBookmarks(user_fid);

            setHeatmapData(heatmapData);
            setRecentAnswers(recentAnswers);
            setUserBookmarks(userBookmarks);
        };
        fetchData();
    }
        , []);

    return (
        <div className="mt-5">
            <p>You are logged in as: {user}</p>
            <p>Your user id is: {user_fid}</p>
            <CalendarHeatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date('2025-01-01')}
                values={heatmapData}
            />
            {/* Spacing */}
            <br />
            <br />
            <Tabs
                id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => setTabKey(k)}
                className="mb-3"
            >


                <Tab eventKey="Tab0" title="Bookmarked Prompts">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Prompt</th>
                                <th>Saved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userBookmarks && userBookmarks.map((userBookmark, index) => (
                                <tr key={index}>
                                    <td>{userBookmark}</td>
                                    <td>0</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="tab1" title="Recent Saved Responses">
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Prompt</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAnswers && recentAnswers.map((answer, index) => (
                                <tr key={index}>
                                    <td>{answer.prompt_message}</td>
                                    <td>{answer.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="tab2" title="Saved Interviews">
                    <Stack direction='horizontal' gap={3} fluid>
                        <Form.Control type="search" placeholder="search" />
                        <Button style={{ width: "160px" }} variant='primary' onClick={handleShow}>
                            <span><BiLayerPlus /></span>
                            <span> Create New</span>
                        </Button>
                    </Stack>
                    <br />
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Interview</th>
                                {/* <th>Header C</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Data A.2</td>
                                {/* <td>Data A.3</td> */}
                            </tr>
                            <tr>
                                <td>Data B.2</td>
                                {/* <td>Data B.3</td> */}
                            </tr>
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

        </div>
    )
}