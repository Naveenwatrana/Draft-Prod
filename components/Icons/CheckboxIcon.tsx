const CheckboxIcon = ({ checked }: { checked: boolean }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {checked && (
        <rect x="3" y="3" width="14" height="14" rx="4" fill="#5FF088" />
      )}
      <rect x="0.5" y="0.5" width="19" height="19" rx="5.5" stroke="#5FF088" />
    </svg>
  );
};

export default CheckboxIcon;
