type BarProps = {
  name: string;
  percentage: number;
  color: string;
};

export function SkillBar(props: BarProps) {
  return (
    <div class="mb-6">
      <div class="flex justify-between mb-1 text-sm font-medium text-nishimiya-dark/80">
        <span>{props.name}</span>
        <span>{props.percentage}%</span>
      </div>
      <div class="w-full bg-nishimiya-soft/40 rounded-full h-4 overflow-hidden">
        <div
          class={`h-full rounded-full transition-all duration-700 ease-in-out ${props.color}`}
          style={{ width: `${props.percentage}%` }}
        />
      </div>
    </div>
  );
}

type StatProps = {
  label: string;
  value: string | number;
};

export function SkillStat(props: StatProps) {
  return (
    <div class="flex flex-col items-center bg-nishimiya-soft/30 rounded-xl p-4 shadow-sm">
      <span class="text-2xl font-bold text-nishimiya-pink">{props.value}</span>
      <span class="text-sm text-nishimiya-dark/80 mt-1">{props.label}</span>
    </div>
  );
}

