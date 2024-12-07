const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uixeifnvrssxivvrldpe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeGVpZm52cnNzeGl2dnJsZHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1ODY2MDgsImV4cCI6MjA0OTE2MjYwOH0.5HUREVCKzABpAoNBxMP_BNLoXwAm1Bi8wX009Qypsns';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;