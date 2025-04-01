import {Strategy} from './strategy'

export class Analyzer {
    strategies: Record<string, Strategy> = {};
  
    use(name: string, strategy: Strategy) {
      this.strategies[name] = strategy;
    }
  
    analyze(name: string, data: string) {
      if (!this.strategies[name]) {
        console.error("content stategy is not specified");
        return false;
      }
  
      return this.strategies[name].analyze.apply(null, [data]);
    }
  }