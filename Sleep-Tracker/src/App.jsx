import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function App() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (start && end) {
      const startTime = dayjs(start);
      let endTime = dayjs(end);
      if (endTime.isBefore(startTime)) {
        endTime = endTime.add(1, 'day');
      }

      const duration = endTime.diff(startTime, 'hour', true);
      setEntries([...entries, duration]);

      setStart(null);
      setEnd(null);
    }
  };

  const getAverage = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((a, b) => a + b, 0);
    return (sum / entries.length).toFixed(2);
  };

  const getSleepInsight = () => {
    const avg = getAverage();
    if (avg >= 7) return '✅ Great job! Your sleep cycle is healthy.';
    if (avg >= 5) return '⚠️ Getting there! Try aiming for 7+ hours.';
    return '❌ Poor sleep cycle. Consider reducing screen time, avoiding caffeine, and maintaining consistency.';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000000, #1a1a1d, #0f2027)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 5,
            maxWidth: 650,
            width: '100%',
            borderRadius: '25px',
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 25px rgba(58, 189, 255, 0.2)',
            color: '#fff',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            fontWeight={800}
            textAlign="center"
            sx={{
              background: 'linear-gradient(to right, #56ccf2, #2f80ed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            💤 Sleep Cycle Tracker
          </Typography>

          <Grid container spacing={3} alignItems="center" mt={2}>
            <Grid item xs={6}>
              <TimePicker
                label="Sleep Time"
                value={start}
                onChange={(newValue) => setStart(newValue)}
                ampm
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#56ccf2' },
                        '&:hover fieldset': { borderColor: '#2f80ed' },
                      },
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Wake Time"
                value={end}
                onChange={(newValue) => setEnd(newValue)}
                ampm
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#56ccf2' },
                        '&:hover fieldset': { borderColor: '#2f80ed' },
                      },
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleAddEntry}
              disabled={!start || !end}
              startIcon={<AccessTimeIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '25px',
                background: 'linear-gradient(to right, #56ccf2, #2f80ed)',
                color: '#fff',
                fontWeight: 'bold',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(47,128,237,0.4)',
                },
              }}
            >
              Add Sleep Entry
            </Button>
          </Box>

          <Divider sx={{ my: 4, borderColor: '#56ccf2' }} />

          {entries.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom>
                🧮 Average Sleep:{' '}
                <span style={{ color: '#56ccf2', fontWeight: 'bold' }}>
                  {getAverage()} hrs
                </span>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
                {getSleepInsight()}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {entries.map((duration, index) => (
                  <Chip
                    key={index}
                    label={`${duration.toFixed(1)} hrs`}
                    variant="outlined"
                    sx={{
                      borderColor: '#2f80ed',
                      color: '#fff',
                      background: 'rgba(47,128,237,0.1)',
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
