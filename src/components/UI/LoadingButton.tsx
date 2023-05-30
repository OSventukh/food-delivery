import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingButton({ loading, text}: { loading: boolean, text: string}) {
  
  return (
    <Button type="submit" size="large" disabled={loading} sx={{ position: 'relative' }}>
      {loading && (
        <CircularProgress sx={{ position: 'absolute' }} size={20} />
      )}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        { text }
      </span>
    </Button>
  );
}
