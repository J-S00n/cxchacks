import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Dashboard() {
    return (
        <div>
            <header>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </header>

            <main>
                <section>
                    <div>
                        <div>
                            <h3>Stat 1</h3>
                            <p>0</p>
                        </div>
                        <div>
                            <h3>Stat 2</h3>
                            <p>0</p>
                        </div>
                        <div>
                            <h3>Stat 3</h3>
                            <p>0</p>
                        </div>
                        <div>
                            <h3>Stat 4</h3>
                            <p>0</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <h2>Chart Area</h2>
                        <div>Chart placeholder</div>
                    </div>

                    <div>
                        <h2>Recent Activity</h2>
                        <div>
                            <p>No recent activity</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}