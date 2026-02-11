import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { supabase } from '@configs/supabase';
import { Center, Spinner } from '@chakra-ui/react';
import type { User } from '@supabase/supabase-js';

export const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            // Secure check: getUser() validates the JWT on the server side
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <Center h="100vh" bg="cream.100">
                <Spinner size="xl" color="bronze.500" />
            </Center>
        );
    }

    return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
