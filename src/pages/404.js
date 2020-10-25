import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const NotFound = () => (
    <div style={{ textAlign: 'center' }}>
        <Typography variant="h1" component="h2" gutterBottom>
            404
      </Typography>
        <Typography variant="h6" gutterBottom>
            Not Found
      </Typography>
        <Button variant="outlined" color="primary" component={Link} to="/">
            Go Home
        </Button>
    </div>
);

export default NotFound;